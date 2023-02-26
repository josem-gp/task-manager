require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe "validations" do
    let(:second_tag) { build :tag, name: subject.name, group: subject.group}
    let(:first_tag) { create :tag, name: "Factory tag"}
    subject { create :tag, name: first_tag.name }

    context "when not valid" do     
      it "lacks name" do
        subject.name = nil
        expect(subject).to_not be_valid
        expect(subject.errors["name"]).to include("can't be blank")
      end

      it "has invalid name" do 
        subject.name = "Lorem ipsum dolor sit amet"
        expect(subject).to_not be_valid
        expect(subject.errors["name"]).to include("is too long (maximum is 15 characters)")
      end

      it "has duplicated name in a group" do 
        expect(second_tag).to_not be_valid
      end
    end

    context "when valid" do
      it { is_expected.to be_valid }
    end
  end

  describe 'associations' do
    it { is_expected.to have_many(:tagged_tasks).dependent(:destroy) }
  end

  describe "#save" do
    subject { create :tag, name: "Factory Tag 1" }

    context "when tag is created" do
      it "creates tag slug" do
        expect(subject.slug).to eq("factory_tag_1")
      end
    end

    context "when tag is edited" do
      it "updates tag slug" do
        subject.name = "Factory Tag 2"
        subject.save!
        expect(subject.slug).to eq("factory_tag_2")
      end
    end
  end
end
