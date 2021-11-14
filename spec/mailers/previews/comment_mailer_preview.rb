# Preview all emails at http://localhost:3000/rails/mailers/comment_mailer
class CommentMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/comment_mailer/comment_notification
  def comment_notification
    CommentMailer.comment_notification(Comment.first)
  end

end
