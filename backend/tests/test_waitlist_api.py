"""
Backend API Tests for SunoLegal Waitlist and Lawyer Interest Endpoints
Tests: POST /api/waitlist, POST /api/lawyer-interest, GET /api/waitlist/count, GET /api/lawyer-interest/count
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check endpoint tests"""
    
    def test_health_endpoint(self):
        """Test that health endpoint returns healthy status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "checks" in data
        print(f"Health check passed: {data['status']}")


class TestWaitlistAPI:
    """Waitlist endpoint tests - POST /api/waitlist"""
    
    def test_waitlist_submission_success(self):
        """Test successful waitlist submission with all fields"""
        unique_email = f"test_user_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Test User",
            "email": unique_email,
            "city": "Mumbai",
            "user_type": "citizen"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/waitlist",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "waitlist_id" in data
        assert "message" in data
        print(f"Waitlist submission success: {data['message']}")
    
    def test_waitlist_submission_minimal(self):
        """Test waitlist submission with minimal valid data"""
        unique_email = f"test_minimal_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Test",
            "email": unique_email,
            "city": "Other",
            "user_type": "citizen"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/waitlist",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"Minimal waitlist submission success")
    
    def test_waitlist_duplicate_email(self):
        """Test that duplicate email returns appropriate message"""
        unique_email = f"test_dup_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Test User",
            "email": unique_email,
            "city": "Delhi",
            "user_type": "student"
        }
        
        # First submission
        response1 = requests.post(
            f"{BASE_URL}/api/waitlist",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response1.status_code == 200
        
        # Second submission with same email
        response2 = requests.post(
            f"{BASE_URL}/api/waitlist",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response2.status_code == 200
        data = response2.json()
        assert data["success"] == True
        assert "already" in data["message"].lower()
        print(f"Duplicate email handled correctly: {data['message']}")
    
    def test_waitlist_count(self):
        """Test waitlist count endpoint"""
        response = requests.get(f"{BASE_URL}/api/waitlist/count")
        
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        assert data["count"] >= 0
        print(f"Waitlist count: {data['count']}")


class TestLawyerInterestAPI:
    """Lawyer Interest endpoint tests - POST /api/lawyer-interest"""
    
    def test_lawyer_interest_submission_success(self):
        """Test successful lawyer interest submission with all fields"""
        unique_email = f"test_lawyer_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Adv. Test Lawyer",
            "email": unique_email,
            "city": "Mumbai",
            "practice_area": "Family Law",
            "experience": "5"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/lawyer-interest",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "message" in data
        print(f"Lawyer interest submission success: {data['message']}")
    
    def test_lawyer_interest_minimal(self):
        """Test lawyer interest submission with minimal valid data"""
        unique_email = f"test_lawyer_min_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Test Lawyer",
            "email": unique_email,
            "city": "Other",
            "practice_area": "",
            "experience": ""
        }
        
        response = requests.post(
            f"{BASE_URL}/api/lawyer-interest",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"Minimal lawyer interest submission success")
    
    def test_lawyer_interest_duplicate_email(self):
        """Test that duplicate lawyer email returns appropriate message"""
        unique_email = f"test_lawyer_dup_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Adv. Duplicate Test",
            "email": unique_email,
            "city": "Bangalore",
            "practice_area": "Criminal Law",
            "experience": "10"
        }
        
        # First submission
        response1 = requests.post(
            f"{BASE_URL}/api/lawyer-interest",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response1.status_code == 200
        
        # Second submission with same email
        response2 = requests.post(
            f"{BASE_URL}/api/lawyer-interest",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response2.status_code == 200
        data = response2.json()
        assert data["success"] == True
        assert "already" in data["message"].lower()
        print(f"Duplicate lawyer email handled correctly: {data['message']}")
    
    def test_lawyer_interest_count(self):
        """Test lawyer interest count endpoint"""
        response = requests.get(f"{BASE_URL}/api/lawyer-interest/count")
        
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        assert data["count"] >= 0
        print(f"Lawyer interest count: {data['count']}")


class TestLawyersAPI:
    """Lawyers listing endpoint tests"""
    
    def test_lawyers_list(self):
        """Test lawyers list endpoint returns data"""
        response = requests.get(f"{BASE_URL}/api/lawyers/list")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "items" in data
        assert isinstance(data["items"], list)
        print(f"Lawyers list returned {len(data['items'])} lawyers")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
