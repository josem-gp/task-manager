require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe "model validation" do
    context "when not valid" do     
      let(:tag_without_name){ build :tag_without_name}
      let(:tag_with_invalid_name){ build :tag_with_invalid_name}

      it "lacks name" do
        expect(tag_without_name).to_not be_valid
        expect(tag_without_name.errors["name"]).to include("can't be blank")
      end

      it "has invalid name" do 
        expect(tag_with_invalid_name).to_not be_valid
        expect(tag_with_invalid_name.errors["name"]).to include("is too long (maximum is 15 characters)")
      end
    end

    context "when valid" do
      subject { create :valid_tag }

      it { is_expected.to be_valid }
    end
  end

  describe "#save" do
    subject { create :valid_tag }

    context "when tag is created" do
      it "creates tag slug" do
        expect(subject.slug).to eq("factory_tag")
      end
    end
  end
end
