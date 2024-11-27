# School Management API

A RESTful API service for managing school locations and finding nearby schools based on geographical coordinates.

## 🌟 Live API
The API is hosted at: https://school-api-nk9f.onrender.com

## 🚀 Features

- Add new schools with location details
- List schools sorted by distance from a given location
- Input validation for all endpoints
- Distance calculation using Haversine formula

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL (CockroachDB)
- Joi (for validation)
- Render (for deployment)

## 📝 API Endpoints

### 1. Add School
- **Endpoint:** `POST /api/addSchool`
- **Description:** Add a new school with its location details. Prevents duplicate schools with the same name and coordinates.
- **Request Body:** 
`{
"name": "School Name",
"address": "School Address",
"latitude": 12.9716,
"longitude": 77.5946
}`
- **Success Response (201):**
```json
{
	"message": "School added successfully",
	"schoolId": 1
}
```

### 2. List Schools
- **Endpoint:** `GET /api/listSchools`
- **Description:** Get all schools sorted by distance from given coordinates
- **Query Parameters:**
  - `latitude`: User's latitude (required)
  - `longitude`: User's longitude (required)
- **Success Response (200):**
```json
[
	{
		"id": 1,
		"name": "School Name",
		"address": "School Address",
		"latitude": 12.9716,
		"longitude": 77.5946,
		"created_at": "2024-03-14T12:00:00.000Z",
		"distance": 0.5
	}
]
```


## 🔍 Distance Calculation

The API uses the Haversine formula to calculate the distance between two geographical points. This provides accurate distance measurements taking into account the Earth's curvature.

## 🧪 Testing

A Postman collection is provided for testing all API endpoints. The collection includes:
- Valid test cases for adding schools in different locations
- Test cases for listing schools from different reference points
- Error test cases for validation and error handling

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/31769452-28d96c81-f05d-4514-8413-71b3565e7d9f?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D31769452-28d96c81-f05d-4514-8413-71b3565e7d9f%26entityType%3Dcollection%26workspaceId%3D856f2eeb-2e3c-44ca-990f-9db843ea39da)



