import boto3
import os
from get import get_from_dynamodb

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


def delete(event, context):

    id = event['pathParameters']['id']
    user = event['requestContext']['authorizer']['claims']['email']

    item = get_from_dynamodb(id, user)

    if(item is None):
        return {
            "statusCode": 404,
            "body": '{"message": "Not found"}',
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            }
        }

    response = table.delete_item(Key={"id": id})

    print(response)

    return {
        "statusCode": 200,
        "body": '{"message": "Deleted."}',
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        }
    }
