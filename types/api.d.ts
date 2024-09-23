interface AuthToken {
    access: JwtToken;
    refresh: JwtToken;
  }
  
  type JwtToken = string;

interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    age: string;
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
  