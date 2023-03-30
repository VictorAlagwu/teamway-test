export default function asyncHandler(handler: any) {
    return async (data?: object|null, id?: string|null) => {
      try {
        return await handler(data, id);
      } catch (ex) {
        throw ex;
      }
    };
  }