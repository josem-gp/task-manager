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
        obj.slice(*attributes)
      end
    else
      object.slice(*attributes)
    end
  end

  # We want to return each task and their tags
  def build_task_json(task)
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

   # We want to return each user and their icon
   def build_user_json(user)
    if user.respond_to?(:map)
      user.map { |u|  
        { user: select_attributes(u, ['id', 'username', 'email', 'icon_id']),
          user_icon: select_attributes(u.icon, ['id', 'name', 'url']),
        }
      }
    else
      { user: select_attributes(user, ['id', 'username', 'email', 'icon_id']),
        user_icon: select_attributes(user.icon, ['id', 'name', 'url']),
      }
    end
  end
end
