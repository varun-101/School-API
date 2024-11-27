import pool from '../config/database.js';

export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    
    // Check if a school with same name and coordinates exists
    const existingSchool = await pool.query(
      'SELECT * FROM schools WHERE name = $1 AND latitude = $2 AND longitude = $3',
      [name, latitude, longitude]
    );

    if (existingSchool.rows.length > 0) {
      return res.status(409).json({
        error: 'A school with the same name and location already exists',
        existingSchool: existingSchool.rows[0]
      });
    }
    
    const result = await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      message: 'School added successfully',
      schoolId: result.rows[0].id
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Failed to add school' });
  }
};

export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const schools = await pool.query(`
        SELECT * FROM schools;
      `);
    
    const schoolsWithDistance = schools.rows.map(school => ({
      ...school,
      distance: getDistanceFromLatLonInKm(latitude, longitude, school.latitude, school.longitude)
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({ error: 'Failed to list schools' });
  }
}; 

// Function to calculate distance between two points in km
// Got this function from https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }