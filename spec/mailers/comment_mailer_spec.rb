# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CommentMailer, type: :mailer do
  describe 'comment_notification' do
    let!(:user) { create(:user) }
    let(:post) { create(:post) }
    let(:comment) { create(:comment, post_id: post.id) }
    let(:mail) { described_class.comment_notification(comment) }

    it 'renders the headers' do
      expect(mail.subject).to eq('[ShareFolioからのお知らせ] コメントがつきました！')
      expect(mail.to).to eq([user.email])
    end
  end
end
