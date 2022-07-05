import os
from twilio.rest import Client
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant

TWILIO_ACCOUNT_SID = os.environ["TWILIO_ACCOUNT_SID"]
TWILIO_AUTH_TOKEN = os.environ["TWILIO_AUTH_TOKEN"]


# token = AccessToken(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, api_secret)
print(TWILIO_ACCOUNT_SID)
print(TWILIO_AUTH_TOKEN)
twilio_api = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
def sms():
    ph_no = "917973813898"
    print('+'+ph_no)
    message = twilio_api.messages.create(
                              body='Welcome to ANM Staffing! Your profile account is under review. We will get in touch asap.',
                              from_='+18504092872',
                              to='+'+ph_no)
    print("message sid console--->",message.sid)

sms()