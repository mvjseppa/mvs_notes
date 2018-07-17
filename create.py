import boto3
import json
import os
import uuid
from get import build_response

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


def create(event, context):

    print(event)

    data = json.loads(event['body'])
    username = event['requestContext']['authorizer']['claims']['email']

    item = {
        'id': str(uuid.uuid1()),
        'text': data['text'],
        'color': data['color'],
        'user': username
    }

    table.put_item(Item=item)
    return build_response(200, json.dumps(item))
