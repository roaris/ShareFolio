# frozen_string_literal: true

class CommentMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.comment_mailer.comment_notification.subject
  #
  def comment_notification(comment)
    @post = comment.post
    @user = @post.user
    mail to: @user.email, subject: '[ShareFolioからのお知らせ] コメントがつきました！'
  end
end
