// ❌ WRONG — returns a Promise
// const asyncHandler = async (fn: any) => { ... }

// ✅ RIGHT — returns a middleware function directly
const asyncHandler = (fn: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
