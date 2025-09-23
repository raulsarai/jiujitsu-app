import { supabase } from '../config/supabase';

class ClassService {
  async findAll() {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .limit(100);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

export default new ClassService();