import boto3
import os
import json
from get import get_from_dynamodb, build_response

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


def delete(event, context):

    id = event['pathParameters']['id']
    user = event['requestContext']['authorizer']['claims']['email']

    response = table.delete_item(Key={"id": id}, ReturnValues='ALL_OLD')
    print(response)
    print(response.keys())

    http_status = response['ResponseMetadata']['HTTPStatusCode']

    if 'Attributes' not in response.keys():
        http_status = 404 #not found

    return build_response(http_status, json.dumps(response))
