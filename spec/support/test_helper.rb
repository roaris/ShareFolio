# frozen_string_literal: true

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

  def default_post_params
    {
      post: {
        app_name: 'test_app',
        app_url: 'test_app_url',
        repo_url: 'test_repo_url',
        description: 'test_description',
      },
    }
  end

  def default_user_params
    {
      user: {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
      },
    }
  end
end
