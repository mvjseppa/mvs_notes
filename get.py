import boto3
import json
import os
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


def get(event, context):

    print(event)

    username = event['requestContext']['authorizer']['claims']['email']

    key = {"id": event['pathParameters']['id']}
    response = table.get_item(Key=key)
    item = response['Item']
    print(response)

    if item['user'] != username:
        return {
            "statusCode": 401,
            "body": '{"message": "Unauthorized"}'
        }

    return {
        "statusCode": 200,
        "body": json.dumps(item)
    }


def list(event, context):
    username = event['requestContext']['authorizer']['claims']['email']
    response = table.scan(FilterExpression=Attr('user').eq(username))

    print(response)

    return {
        "statusCode": 200,

        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },

        "body": json.dumps(response['Items'])
    }
