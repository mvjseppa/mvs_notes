import boto3
import os
from get import get_from_dynamodb, build_response

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


def delete(event, context):

    id = event['pathParameters']['id']
    user = event['requestContext']['authorizer']['claims']['email']

    item = get_from_dynamodb(id, user)

    if(item is None):
        return build_response(404, '{"message": "Not found"}')

    response = table.delete_item(Key={"id": id})
    print(response)

    return build_response(200, '{"message": "Deleted."}')
