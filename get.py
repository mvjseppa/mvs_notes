import boto3
import json
import os
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


def build_response(status_code, body_str):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
        },
        "body": body_str
    }


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
        return build_response(404, '{"message": "Not found"}')

    return build_response(200, json.dumps(item))


def list(event, context):
    username = event['requestContext']['authorizer']['claims']['email']
    response = table.scan(FilterExpression=Attr('user').eq(username))

    print(response)

    return build_response(200, json.dumps(response['Items']))
