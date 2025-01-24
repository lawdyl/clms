from flask import Flask, request
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)

# Add a delay to every request to simulate a realistic connection
@app.before_request
def before_request():
  time.sleep(0.3)

# Checks email/password and returns login token to be passed to future requests
@app.route("/login", methods=["POST"])
def login():
  if "email" not in request.json or "password" not in request.json:
    return "", 401
  else:
    return {
      "loginToken": "abcd1234",
    }

# Returns details for the given user
# (would return 403 if current user doesn't have permissions to view this user's details)
@app.route("/user/<email>")
def identity(email):
  return {
    "id": 4321,
    "email": email,
    "firstName": "John",
    "secondName": "Smith"
  }

# Lists the organisations the given user has permissions for
# (would return 403 if current user doesn't have permission to view this user's organisations)
@app.route("/user/<email>/organisations")
def list_organisations(email):
  return [
    {
      "id": 1,
      "displayName": "Organisation 1",
      "permission": "Read",
    },
    {
      "id": 2,
      "displayName": "Organisation 2",
      "permission": "ReadWrite",
    }
  ]

# Lists the cohorts for a given organisation
@app.route("/organisation/<organisationId>/cohorts")
def list_cohorts(organisationId):
  return [
    {
      "id": 1,
      "displayName": "Cohort 1",
    },
    {
      "id": 2,
      "displayName": "Cohort 2",
    },
    {
      "id": 3,
      "displayName": "Cohort 3",
    },
    {
      "id": 4,
      "displayName": "Cohort 4",
    },
    {
      "id": 5,
      "displayName": "Cohort 5",
    },
  ]

# Lists the students for a given cohort
@app.route("/organisation/<organisationId>/cohort/<cohortId>/students")
def list_students(organisationId, cohortId):
  time.sleep(1.5)
  return [generate_student(i) for i in range(1, random.randint(42, 51))]



# top 50 names/surnames in the UK in 2023
firstNames = ["Noah", "Theo", "Luca", "Arthur", "Oliver", "Archie", "George", "Leo", "Freddie", "Arlo", "Alfie", "Oscar", "Teddy", "Henry", "Albie", "Finley", "Jude", "Charlie", "Elijah", "Tommy", "Harry", "Oakley", "Hudson", "Roman", "Rory", "Olivia", "Amelia", "Isla", "Lily", "Freya", "Ava", "Ivy", "Florence", "Willow", "Isabella", "Poppy", "Sophia", "Evelyn", "Elsie", "Sienna", "Mia", "Daisy", "Grace", "Sofia", "Phoebe", "Rosie", "Harper", "Charlotte", "Evie", "Millie"]
secondNames = ["Smith", "Jones", "Williams", "Taylor", "Brown", "Davies", "Evans", "Wilson", "Thomas", "Johnson", "Roberts", "Robinson", "Thompson", "Wright", "Walker", "White", "Edwards", "Hughes", "Green", "Hall", "Lewis", "Harris", "Clarke", "Patel", "Jackson", "Wood", "Turner", "Martin", "Cooper", "Hill", "Ward", "Morris", "Moore", "Clark", "Lee", "King", "Baker", "Harrison", "Morgan", "Allen", "James", "Scott", "Phillips", "Watson", "Davis", "Parker", "Price", "Bennett", "Young", "Griffiths"]
statuses = [{
  "statusCode": 0,
  "displayName": "Not Assessed",
},
{
  "statusCode": 1,
  "displayName": "Clear",
},
{
  "statusCode": 2,
  "displayName": "Moderate",
},
{
  "statusCode": 3,
  "displayName": "Severe",
}]

def generate_student(id):
  status = random.choice(statuses)
  return {
    "id": id,
    "firstName": random.choice(firstNames),
    "secondName": random.choice(secondNames),
    "statusCode": status["statusCode"],
    "statusDisplayName": status["displayName"],
  }