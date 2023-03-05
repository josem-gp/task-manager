require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "validations" do
    let(:second_task) { build :task, name: subject.name, group: subject.group}
    subject { create :task, name: "Factory task" }

    context "when not valid" do     
      it "lacks name" do
        subject.name = nil
        expect(subject).to_not be_valid
        expect(subject.errors["name"]).to include("can't be blank")
      end

      it "has invalid name" do 
        subject.name = "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet"
        expect(subject).to_not be_valid
        expect(subject.errors["name"]).to include("is too long (maximum is 25 characters)")
      end

      it "has invalid date" do
        subject.due_date = "32/07/2050"
        expect(subject).to_not be_valid
      end

      it "has invalid formatted date" do 
        subject.due_date = "07/25/2050"
        expect(subject).to_not be_valid
      end
      
      it "has duplicated name in a group" do 
        expect(second_task).to_not be_valid
      end
    end

    context "when valid" do
      it { is_expected.to be_valid }
    end
  end

  describe 'associations' do
    it { is_expected.to have_many(:tagged_tasks).dependent(:destroy) }
  end
end
