interface PromiseFulfilled {
  status: 'fulfilled'
  value: any
}

interface PromiseRejected {
  status: 'rejected'
  reason: any
}

export const allSettled = <T>(promises: (Promise<T> | T)[]) =>
  Promise.all(
    promises.map((promise) =>
      Promise.resolve(promise)
        .then(
          (value): PromiseFulfilled => {
            return {
              status: 'fulfilled',
              value,
            }
          }
        )
        .catch(
          (reason): PromiseRejected => {
            return {
              status: 'rejected',
              reason,
            }
          }
        )
    )
  )
