module ApiHelper
  # To remove attributes we don't want from a json before render
  def except_attributes(object, attributes)
    attributes = attributes.map(&:to_s)
    if object.respond_to?(:map)
      object.map do |obj|
        obj.attributes.except(*attributes)
      end
    else
      object.attributes.except(*attributes)
    end
  end

  # To render the json only with the attributes we want
  def select_attributes(object, attributes)
    attributes = attributes.map(&:to_s)
    if object.respond_to?(:map)
      object.map do |obj|
        object.u.slice(*attributes)
      end
    else
      object.u.slice(*attributes)
    end
  end

  # We want to return each task and their tags
  def build_json(task)
    if task.respond_to?(:map)
      task.map { |t|  
        { task: except_attributes(t, ['created_at', 'updated_at']),
          task_tags: except_attributes(t.tags, ['created_at', 'updated_at']),
        } 
      }
    else
      { task: except_attributes(task, ['created_at', 'updated_at']),
        task_tags: except_attributes(task.tags, ['created_at', 'updated_at']),
      }
    end
  end
end
