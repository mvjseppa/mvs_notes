import boto3
import json
import os
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


def get_from_dynamodb(id, username):
    response = table.get_item(Key={"id": id})
    try:
        item = response['Item']
        print(response)
    except KeyError:
        return None

    if item['user'] != username:
        return None

    return item


def get(event, context):

    print(event)

    id = event['pathParameters']['id']
    username = event['requestContext']['authorizer']['claims']['email']

    item = get_from_dynamodb(id, username)

    if item is None:
        return {
            "statusCode": 404,
            "body": '{"message": "Not found"}'
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
