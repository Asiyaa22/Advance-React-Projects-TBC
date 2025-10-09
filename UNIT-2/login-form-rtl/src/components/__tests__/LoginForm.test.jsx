import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'
import { vi } from 'vitest'

describe('LoginForm', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('submits credentials and shows success message', async () => {
    // mock global fetch for success
    const fakeResponse = { username: 'alice' }
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fakeResponse,
    })
    global.fetch = mockFetch

    render(<LoginForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/username/i), 'alice')
    await user.type(screen.getByLabelText(/password/i), 'hunter2')
    await user.click(screen.getByRole('button', { name: /login/i }))

    // wait for success message:
    const success = await screen.findByText(/Welcome, alice/i)
    expect(success).toBeInTheDocument()

    expect(mockFetch).toHaveBeenCalledTimes(1)
    const [url, opts] = mockFetch.mock.calls[0]
    expect(url).toBe('/api/login')
    expect(JSON.parse(opts.body)).toEqual({ username: 'alice', password: 'hunter2' })
  })

  it('shows error message on failed login', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Invalid creds' }),
    })
    global.fetch = mockFetch

    render(<LoginForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/username/i), 'bob')
    await user.type(screen.getByLabelText(/password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /login/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/Invalid creds/i)
  })

  it('handles network error gracefully', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network down'))
    global.fetch = mockFetch

    render(<LoginForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/username/i), 'x')
    await user.type(screen.getByLabelText(/password/i), 'y')
    await user.click(screen.getByRole('button', { name: /login/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/Network down/i)
  })
})
