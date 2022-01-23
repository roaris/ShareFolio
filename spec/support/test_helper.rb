# frozen_string_literal: true

module TestHelper
  def login_as(user)
    allow_any_instance_of(Firebase::Auth::Authenticable).to receive(:authenticate_entity).and_return(user)
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
        app_url: 'https://example.com/app',
        repo_url: 'https://example.com/repo',
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

  def default_comment_params
    {
      comment: {
        content: 'test'
      }
    }
  end
end
