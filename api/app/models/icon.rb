class Icon < ApplicationRecord
  
  IMAGES = ["https://res.cloudinary.com/ddokq60ys/image/upload/v1622286125/Neighbourly/default-icon_lzzb8i.png",
          "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280411/Neighbourly/icon30_pyxzxh.png", "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280410/Neighbourly/icon27_vyhm8t.png",
          "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280410/Neighbourly/icon21_culb3m.png", "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280410/Neighbourly/icon23_wqvqek.png",
          "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280410/Neighbourly/icon20_jd1emu.png", "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280410/Neighbourly/icon18_n11d1y.png",
          "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280410/Neighbourly/icon16_gkpulz.png", "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280409/Neighbourly/icon7_ha9wlq.png",
          "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280409/Neighbourly/icon11_arvrei.png", "https://res.cloudinary.com/ddokq60ys/image/upload/v1622280408/Neighbourly/icon1_hnm0ki.png"]

  has_many :users
  validates :url, presence: true, inclusion: { in: IMAGES }
  validates :name, presence: true
end
