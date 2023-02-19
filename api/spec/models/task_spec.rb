require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "model validation" do

    context "when not valid" do     
      subject { build :valid_task }

      let(:task_without_name){ build :task_without_name}
      let(:task_with_invalid_name){ build :task_with_invalid_name}

      it "lacks name" do
        expect(task_without_name).to_not be_valid
        expect(task_without_name.errors["name"]).to include("can't be blank")
      end

      it "has invalid name" do 
        expect(task_with_invalid_name).to_not be_valid
        expect(task_with_invalid_name.errors["name"]).to include("is too long (maximum is 25 characters)")
      end

      it "has invalid date" do
        subject.due_date = "32/07/2050"
        expect(subject).to_not be_valid
      end

      it "has invalid formatted date" do 
        subject.due_date = "07/25/2050"
        expect(subject).to_not be_valid
      end
    end

    context "when valid" do
      subject { create :valid_task }

      it { is_expected.to be_valid }
    end
  end
end
