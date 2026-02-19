export interface Product {
    id: number;
    nombre: string;
    precio: number;
    categoria: 'Anime' | 'Llaveros' | 'Repuestos' | 'Custom';
    descripcion: string;
    imagen: string;
}

export const productos: Product[] = [
    {
        id: 1,
        nombre: "Tsunade Sexi",
        precio: 120000,
        categoria: "Anime",
        descripcion: "Figura de alta calidad de Tsunade en estado sexi. Acabado detallado.",
        imagen: "/tsunade.jpg"
    },
    {
        id: 2,
        nombre: "Goku",
        precio: 180000,
        categoria: "Anime",
        descripcion: "Estatua de Goku en estado base. Pintada a mano con precisión.",
        imagen: "/goku.jpg"
    },
    {
        id: 3,
        nombre: "Llavero Cyberpunk",
        precio: 8.50,
        categoria: "Llaveros",
        descripcion: "Llavero con diseño futurista y neón reactivo.",
        imagen: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        id: 4,
        nombre: "Engranaje Industrial 20T",
        precio: 12.00,
        categoria: "Repuestos",
        descripcion: "Engranaje de alta resistencia para impresoras 3D y robótica.",
        imagen: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        id: 5,
        nombre: "Boquilla Extrusor 0.4mm",
        precio: 5.00,
        categoria: "Repuestos",
        descripcion: "Boquilla de latón de precisión para filamentos estándar.",
        imagen: "https://images.unsplash.com/photo-1616440347437-b1c73bc9a137?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        id: 6,
        nombre: "gokus4",
        precio: 80000,
        categoria: "Anime",
        descripcion: "Modelo detallado de Goku en estado SS4.",
        imagen: "/gokus4.jpg"
    },
    {
        id: 7,
        nombre: "Llavero Shiba Inu",
        precio: 7.00,
        categoria: "Llaveros",
        descripcion: "Llavero adorable de Shiba Inu impreso en 3D.",
        imagen: "https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        id: 8,
        nombre: "Soporte Bobina Filamento",
        precio: 15.00,
        categoria: "Repuestos",
        descripcion: "Soporte robusto para bobinas de 1kg.",
        imagen: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        id: 9,
        nombre: "Custom Figura RPG",
        precio: 25.00,
        categoria: "Custom",
        descripcion: "Servicio de impresión para tu personaje de RPG.",
        imagen: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        id: 10,
        nombre: "Keycap Artesanal",
        precio: 18.00,
        categoria: "Llaveros",
        descripcion: "Tecla personalizada para teclados mecánicos.",
        imagen: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        id: 11,
        nombre: "Sabo Luffy Ace Boys",
        precio: 180000,
        categoria: "Anime",
        descripcion: "Estatua de Sabo Luffy Ace Boys. Pintada a mano con precisión.",
        imagen: "/saboluffyace.jpg"
    },

    {
        id: 12,
        nombre: "Tanjiro",
        precio: 110000,
        categoria: "Anime",
        descripcion: "Estatua de Tanjiro. Pintada a mano con precisión.",
        imagen: "/il_fullxfull.5855239846_bezk.webp"
    },
];
