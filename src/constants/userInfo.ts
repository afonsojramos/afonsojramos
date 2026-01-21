export const userInfo = {
  name: "Afonso Jorge Ramos",
  handle: "@afonsojramos",
  title: "Senior Software Engineer",
  tagline: "Avid enthusiast for open source software development.",
  subTagline: "Open source perspective of life.",
  email: "afonsojorgeramos@gmail.com",
} as const;

export interface Link {
  label: string;
  value: string;
  url: string;
  color: string;
  hotkey: string;
}

export const links: Link[] = [
  {
    label: "GitHub",
    value: "afonsojramos",
    url: "https://github.com/afonsojramos",
    color: "#0969da",
    hotkey: "g",
  },
  {
    label: "LinkedIn",
    value: "afonsojramos",
    url: "https://linkedin.com/in/afonsojramos",
    color: "#0072b1",
    hotkey: "l",
  },
  {
    label: "Website",
    value: "afonsojramos.me",
    url: "https://afonsojramos.me",
    color: "#00d9ff",
    hotkey: "w",
  },
  {
    label: "Cal.com",
    value: "afonsojramos",
    url: "https://cal.com/afonsojramos",
    color: "#ff6b6b",
    hotkey: "c",
  },
];

export const menuActions = [
  {
    label: "Send me an email",
    value: "email",
    hotkey: "e",
  },
  {
    label: "Just quit",
    value: "quit",
    hotkey: "q",
  },
] as const;
