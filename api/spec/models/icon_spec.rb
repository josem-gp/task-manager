require 'rails_helper'

RSpec.describe Icon, type: :model do
  describe "validations" do

    subject { create :icon }

    context "when not valid" do     
      let(:icon_with_invalid_image) { build :icon_with_invalid_image} 

      it "lacks name" do
        subject.name = nil
        expect(subject).to_not be_valid
        expect(subject.errors["name"]).to include("can't be blank")
      end

      it "lacks image url" do 
        subject.url = nil
        expect(subject).to_not be_valid
        expect(subject.errors["url"]).to include("can't be blank")
      end

      it "url not in IMAGES" do 
        expect(icon_with_invalid_image).to_not be_valid
        expect(icon_with_invalid_image.errors["url"]).to include("is not included in the list")
      end
    end

    context "when valid" do
      it { is_expected.to be_valid }
    end
  end
end
