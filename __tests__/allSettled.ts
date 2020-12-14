import { allSettled } from '../src'

test('using allSettled function', async () => {
  const promise1 = Promise.resolve('promise1')
  const promise2 = new Promise((resolve) =>
    setTimeout(() => resolve('promise2'), 10)
  )
  const promise3 = 'promise3'
  const promise4 = Promise.reject(new Error('promise4'))

  const promises = [promise1, promise2, promise3, promise4]

  const resolves = await allSettled(promises)

  expect(resolves).toEqual([
    {
      status: 'fulfilled',
      value: 'promise1',
    },
    {
      status: 'fulfilled',
      value: 'promise2',
    },
    {
      status: 'fulfilled',
      value: 'promise3',
    },
    {
      status: 'rejected',
      reason: new Error('promise4'),
    },
  ])
})
