module TestHelper
  def log_in_as(user)
    allow_any_instance_of(ActionDispatch::Request).to receive(:session).and_return({ user_id: user.id })
  end

  def xhr_header
    { 'X-Requested-With': 'XMLHttpRequest' }
  end

  def json_header
    { 'Content-Type': 'application/json' }
  end

  def json(response)
    JSON.parse(response.body)
  end
end
