require 'rails_helper'

RSpec.describe Icon, type: :model do
  describe "model validation" do
    context "when not valid" do     
      let(:icon_without_name){ build :icon_without_name}
      let(:icon_without_image){ build :icon_without_image}
      let(:icon_with_invalid_image){ build :icon_with_invalid_image} 

      it "lacks name" do
        expect(icon_without_name).to_not be_valid
        expect(icon_without_name.errors["name"]).to include("can't be blank")
      end

      it "lacks image url" do 
        expect(icon_without_image).to_not be_valid
        expect(icon_without_image.errors["url"]).to include("can't be blank")
      end

      it "url not in IMAGES" do 
        expect(icon_with_invalid_image).to_not be_valid
        expect(icon_with_invalid_image.errors["url"]).to include("is not included in the list")
      end
    end

    context "when valid" do
      subject { build :valid_icon }

      it { is_expected.to be_valid }
    end
  end
end
