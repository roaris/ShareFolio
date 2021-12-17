# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CommentMailer, type: :mailer do
  describe 'comment_notification' do
    let(:comment) { create(:comment) }
    let(:mail) { described_class.comment_notification(comment) }

    it 'renders the headers' do
      expect(mail.subject).to eq('[ShareFolioからのお知らせ] コメントがつきました！')
      expect(mail.to).to eq([comment.post.user.email])
    end
  end
end
