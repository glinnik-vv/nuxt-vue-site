interface AuthToken {
    access: JwtToken;
    refresh: JwtToken;
  }
  
  type JwtToken = string;

interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    surname: string;
    id_pac: string;
    birth_date: string;
    sex: string;
    snils: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Post {
    id: number;
    title: string;
    text: string;
    created_at: string;
    updated_at: string;
    user: number;
    category: number;
  }
  
  interface PaginatedResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Any[];
  }

  interface Category {
    id: number;
    code: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    user: number;
  }
  