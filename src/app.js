const express = require('express');

const app = express()

const fs = require('fs');


class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }



  addProduct(product) {
	//validacion para que todos los campos esten llenos
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      return console.log("Todos los campos son obligatorios.");
    }
	// validacion para que no se repita el code 
	const productExists = this.products.find((product) => product.code === data.code);
	if(productExists) {
	   return console.log('Code repetido. No se puede repetir el code');
	}

    product.id = this.products.length + 1;
    this.products.push(product);

    this.guardarProductos();
    
  }



  getProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer los productos:', err);
          return reject(err);
        }
        if (data === '') {
          return resolve([]);
        }
        const products = JSON.parse(data);
        return resolve(products);
      });
    });
  }

  getProductById(id) {
    return this.getProducts()
      .then((products) => {
        const product = products.find((product) => product.id === id);
        return product;
      })
      .catch((e) => {
        console.log('Error al obtener el producto:', e);
        return e;
      });
  }

  updateProduct(id, updateProduct) {
    this.getProducts()
      .then((products) => {
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
          return;
        }
        products[productIndex].title = updateProduct.title;
        products[productIndex].description = updateProduct.description;
        products[productIndex].price = updateProduct.price;
        products[productIndex].thumbnail = updateProduct.thumbnail;
        products[productIndex].code = updateProduct.code;
        products[productIndex].stock = updateProduct.stock;

        this.guardarProductos(products);
        
      })
      .catch((e) => {
        console.log('Error al obtener el producto:', e);
        return e;
      });
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return console.log('Producto no encontrado');
    }

    this.products.splice(productIndex, 1);
    this.guardarProductos();

    console.log('Producto eliminado');
  }

  leerProductos() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      if (data === '') {
        console.log(data);
        return [];
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Error al leer los productos:', err);
      return [];
    }
  }

  guardarProductos(products) {
    try {
      const data = JSON.stringify(products || this.products, null, 2);
      fs.writeFileSync(this.path, data, 'utf-8');
    } catch (err) {
      console.log('Error al guardar los productos');
    }
  }
}


app.get('/products', async (req, res) => {
	try{
		const limit = parseInt(req.query.limit);
		const products = await manager.getProducts();

		if (isNaN(limit)){
			res.json(products)
		}else {
			res.json(products.splice(0,limit))
		}
	}catch (error){
		console.error('Error al obtener el producto:',error)
	}
})

app.get('/products/:pid', async (req, res) => {
	try{
		const productId = parseInt(req.params.pid);
		const product = await manager.getProductById(productId);

		if (product){
			res.json(product);
		}else {
			res.json('No existe el producto')
			console.log('Producto no encontrado')
		}
	}catch (error){
		console.error('Error al obtener el producto:',error)
	}
})

app.listen(8080, () => {
	console.log('Servidor express escuchando en el puerto 8080')
  })

const manager = new ProductManager('./product.json');

//agregamos un producto nuevo
/*manager.addProduct({
  title: "Dunk Low Retro",
  description:  "ZAPATILLAS",
  price: 72.999,
  thumbnail: "Dunk-Low-Retro.png",
  code: "qwerty",
  stock: 20,
});*/

//obtenemos todos los productos 
/*manager.getProducts()
  .then((products) => {
    console.log(products);
  })
  .catch((err) => {
    console.error('Error al obtener los productos:', err);
  });*/


//buscammos un elemento por id 
/*manager.getProductById(1)
  .then((product) => {
    console.log(product);
  })
  .catch((err) => {
    console.error('Error al obtener el producto:', err);
  });*/


//actualiza el producto en el archivo
/*manager.updateProduct(1,{
  title: "Fantoche",
  description: "alfajor",
  price: 100,
  thumbnail: "img.fantoche",
  code: "fsdrwe",
  stock: 10
});*/


//elimina el producto por el id
/*manager.deleteProduct(2)*/