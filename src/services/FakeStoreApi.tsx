

    
export const getResource = async (url: string) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export const getAllCharacters = async () => {
    const res = await getResource('https://fakestoreapi.com/products');
    return res.map(_transfromCharacter);
}

export const _transfromCharacter = (item: any) => {
    return {
        id: item.id,
        category: item.category,
        // title: item.title.length > 40 ? item.title.slice(0, 40) + "...": item.title,
        // description: item.description.length > 85 ? item.description.slice(0, 85) + "...": item.description,
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price
    }
}
