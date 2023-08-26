import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../CustomersController';
import { CustomersService } from '../../service/CustomersService';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
              phone: 'phone'
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email","phone":"phone"}]',
      });
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });

    it('Should returns apiResponseBadRequestError', async () => {
      //Preparamos
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
              phone: 'phone'
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers'
      } as unknown as APIGatewayProxyEvent);

      expect(response).toEqual({
        statusCode: 400,
        isBase64Encoded: false,
      })
    })
  });



  describe('ApiResponseBadRequestError', () => {
    it('Should returns Bad Request Error', () => {
      //Preparamos
      const service = {
        findByFilter: jest.fn(),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      const response = controller.apiResponseBadRequestError()

      expect(response).toEqual({
        statusCode: 400,
        isBase64Encoded: false,
      })
    })
  })


});
