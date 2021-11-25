# frozen_string_literal: true

module TestHelper
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
      },
    }
  end
end
