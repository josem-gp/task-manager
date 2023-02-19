FactoryBot.define do
  factory :icon do
    
    name { "default_icon" } #name is default_icon because that´s the icon that will be tagged to every created user at first
    url { Icon::IMAGES[0] }

    trait :not_in_IMAGES do
      url { "https://image.shutterstock.com/image-photo/glass-cup-hot-aromatic-tea-600w-1146290894.jpg" }
    end

    factory :icon_with_invalid_image, traits: [:not_in_IMAGES]
  end
end
