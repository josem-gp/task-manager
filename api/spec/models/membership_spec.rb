require 'rails_helper'

RSpec.describe Membership, type: :model do
  describe "#delete" do
    let(:user) {create :user}
    let(:group) {create :group}
    let!(:task_one) {create :task, user: group.admin, group: group, assignee: user}
    let!(:task_two) {create :task, user: user, group: group}
    let!(:tag) {create :tag, user: user, group: group}
    subject { create :membership, user: user, group: group }
    
    context "when membership is deleted" do
      before do
        subject.destroy
      end

      it "sets the assignee_id of the task to nil" do
        task_one.reload
        expect(task_one.assignee).to be nil
      end

      it "changes the ownership of user's tasks to group admin" do
        task_two.reload
        expect(task_two.user).to eq(group.admin)
      end

      it "changes the ownership of user's tags to group admin" do
        tag.reload
        expect(tag.user).to eq(group.admin)
      end
    end
  end
end
