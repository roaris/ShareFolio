require 'rails_helper'

RSpec.describe CommentMailer, type: :mailer do
  describe 'comment_notification' do
    let!(:user) { create(:user) }
    let!(:post) { create(:post) }
    let(:comment) { create(:comment) }
    let(:mail) { CommentMailer.comment_notification(comment) }

    it 'renders the headers' do
      expect(mail.subject).to eq('[ShareFolioからのお知らせ] コメントがつきました！')
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(["noreply@#{ENV['MAILGUN_DOMAIN']}"])
    end
  end
end
