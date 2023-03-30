import express from 'express';

export const asyncHandler =
  (expressHandlerFn) =>
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      await expressHandlerFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
