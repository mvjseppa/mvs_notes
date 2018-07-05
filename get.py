import boto3
import json
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


def get(event, context):

    print(event)

    username = event['requestContext']['authorizer']['claims']['email']

    key = {"id": event['pathParameters']['id']}
    dbresult = table.get_item(Key=key)
    item = dbresult['Item']
    print(dbresult)

    if item['user'] != username:
        return {
            "statusCode": 401,
            "body": '{"message": "Unauthorized"}'
        }

    return {
        "statusCode": 200,
        "body": json.dumps(item)
    }
