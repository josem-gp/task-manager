class DateValidator < ActiveModel::EachValidator
  def validate_each(model, attribute, value)
    begin
      # The format that works is dd/mm/yyyy or dd/mm/yy (the rest will give error)
      d, m, y = value.strftime("%d/%m/%Y").split("/").map(&:to_i)
      model.errors.add(attribute, 'date is not valid') unless Date.valid_date?(y, m, d)
    rescue => e
      model.errors.add(attribute, 'date is not valid')
    end
  end
end