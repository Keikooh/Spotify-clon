export interface ExternalUrls {
    spotify: string;
}

export interface ExternalIDS {
    isrc: string;
    ean:  string;
    upc:  string;
}

export interface Followers {
    href?:  string | null;
    total: number;
}

export interface Image {
    url:    string;
    height: number | null;
    width:  number | null;
}

export interface Owner {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    type:          string;
    uri:           string;
    display_name?: string | null;
    name?:  string;
}

export interface Restrictions {
    reason: string;
}

export interface LinkedFrom {
}

export interface Copyright {
    text: string;
    type: string;
}

export interface Paging<T> {
  href:     string;
  limit:    number;
  next:     string | null;
  offset:   number;
  previous: string | null;
  total:    number;
  items:    T[];
}