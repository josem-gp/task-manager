class DateValidator < ActiveModel::EachValidator
  def validate_each(model, attribute, value)
    begin
      # The format that works is yyyy/mm/dd or yyyy-mm-dd (the rest will give error)
      # We receive the date value in a Date format (Mon, 30 Dec 2024). 
      # We pass this to string and get each single value to test if the date is valid
      y, m, d = value.strftime("%Y-%m-%d").split("-").map(&:to_i)
      model.errors.add(attribute, 'date is not valid') unless Date.valid_date?(y, m, d)
    rescue => e
      model.errors.add(attribute, e)
    end
  end
end