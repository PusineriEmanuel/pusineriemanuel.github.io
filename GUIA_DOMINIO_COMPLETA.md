# 📋 GUÍA COMPLETA: DOMINIO PERSONALIZADO PARA PÁGINA WEB

## Proyecto: Viajes de Larga Distancia - Tadeo

---

## 🎯 ¿QUÉ ES EL ARCHIVO CNAME?

El archivo **CNAME** es como una "dirección postal" que le dice a Internet:

> "Cuando alguien escriba tudominio.com, llevalo a pusineriemanuel.github.io"

Es un archivo de texto simple que contiene SOLO el nombre del dominio.

---

## 📋 PASO A PASO COMPLETO

### **PASO 1: COMPRAR EL DOMINIO**

**(CON EL CLIENTE - 30 min)**

#### Datos necesarios del cliente:

- ✅ Nombre/razón social completa
- ✅ CUIT/CUIL
- ✅ Dirección completa
- ✅ Email válido
- ✅ Teléfono

#### Recomendaciones de dominios:

```
viajesch.com.ar          ($3.000/año aprox)
traslados-chascomus.com.ar
viajesaeropuerto.com.ar
viajesdelargadistancia.com.ar
```

#### Dónde comprar:

- **NIC.ar** (oficial argentino) - más barato
- **Donweb** - acepta transferencia/débito
- **Namecheap** - si prefieren .com

---

### **PASO 2: CONFIGURAR DNS**

**(Después de comprar - 10 minutos)**

En el panel del proveedor de dominio, agregar estos registros DNS:

```
Tipo: A     | Nombre: @   | Valor: 185.199.108.153
Tipo: A     | Nombre: @   | Valor: 185.199.109.153
Tipo: A     | Nombre: @   | Valor: 185.199.110.153
Tipo: A     | Nombre: @   | Valor: 185.199.111.153
Tipo: CNAME | Nombre: www | Valor: pusineriemanuel.github.io
```

**¿Qué hace esto?**

- Los registros **A** apuntan `tudominio.com` a GitHub Pages
- El **CNAME** hace que `www.tudominio.com` también funcione

---

### **PASO 3: ACTUALIZAR EL PROYECTO**

**(Cuando sepas el dominio exacto)**

1. **Editar archivo CNAME:**

   - Abrir archivo: `CNAME`
   - Reemplazar contenido por: `tudominio.com.ar`
   - Guardar

2. **Subir cambios a GitHub:**
   ```bash
   git add CNAME
   git commit -m "Agregar dominio personalizado"
   git push
   ```

---

### **PASO 4: CONFIGURAR GITHUB PAGES**

**(Después del push - 2 minutos)**

1. Ir a: `github.com/PusineriEmanuel/pusineriemanuel.github.io`
2. **Settings** → **Pages**
3. **Custom domain**: Escribir el dominio (ej: `viajesch.com.ar`)
4. ✅ **Enforce HTTPS**
5. **Save**

---

## ⏰ CRONOLOGÍA COMPLETA

### **CON EL CLIENTE (30 min):**

- ✅ Recopilar datos personales
- ✅ Elegir nombre de dominio
- ✅ Comprar dominio online juntos

### **DESPUÉS QUE SE VAYA (15 min):**

- ✅ Configurar DNS en el panel del dominio
- ✅ Actualizar archivo CNAME con el dominio real
- ✅ Subir cambios a GitHub
- ✅ Configurar GitHub Pages

### **RESULTADO (24-48 hs):**

- ✅ `sudominio.com` → funciona
- ✅ `www.sudominio.com` → funciona
- ✅ HTTPS automático (candadito verde)

---

## 💬 CÓMO EXPLICÁRSELO AL CLIENTE

> _"Mirá, es muy simple:_
>
> _1. **Compramos tu dominio** con tus datos_ > _2. **Lo conectamos** a donde ya está tu página (GitHub)_  
> _3. **En 24 horas** ya vas a poder poner tudominio.com en Google y ver tu página_ > _4. **Es gratis** mantenerla, solo pagas el dominio una vez al año"_

---

## 🚨 POSIBLES PREGUNTAS DEL CLIENTE

**"¿Cuánto cuesta mantener?"**  
→ Solo el dominio: $3.000/año. El hosting es gratis forever.

**"¿Qué pasa si no renuevo el dominio?"**  
→ Se pierde el dominio, pero la página sigue en pusineriemanuel.github.io

**"¿Puedo cambiar cosas después?"**  
→ Sí, cualquier cambio en la página se hace fácil editando el código.

**"¿Aparece en Google?"**  
→ Sí, ya está optimizada para aparecer en búsquedas.

**"¿Necesito hosting?"**  
→ No, GitHub Pages es gratis y muy confiable.

---

## 📊 COSTOS ESTIMADOS

| Servicio        | Costo Anual                    |
| --------------- | ------------------------------ |
| GitHub Pages    | **GRATIS**                     |
| Dominio .com.ar | $2.000-4.000                   |
| Dominio .com    | $1.500-3.000                   |
| SSL Certificate | **GRATIS** (GitHub automático) |

---

## 🔧 COMANDOS DE GIT ÚTILES

```bash
# Ver estado
git status

# Agregar cambios
git add .
git add archivo.html

# Hacer commit
git commit -m "Descripción del cambio"

# Subir al repositorio
git push

# Ver diferencias
git diff
git diff archivo.css

# Ver historial
git log --oneline
```

---

## 📁 ESTRUCTURA DEL PROYECTO

```
tadeo trip page/
├── index.html          # Página principal
├── css.css             # Estilos
├── js.js               # JavaScript
├── CNAME               # Archivo de dominio personalizado
└── img/                # Imágenes
    ├── auto1.jpeg
    └── logo.png
```

---

## 🌐 URLS IMPORTANTES

- **Repositorio GitHub:** https://github.com/PusineriEmanuel/pusineriemanuel.github.io
- **Página actual:** https://pusineriemanuel.github.io
- **Configuración Pages:** https://github.com/PusineriEmanuel/pusineriemanuel.github.io/settings/pages
- **NIC Argentina:** https://nic.ar
- **Donweb:** https://donweb.com

---

## ✅ CHECKLIST FINAL

### Antes de la reunión:

- [ ] Tener esta guía impresa o en el celular
- [ ] Verificar que la página actual funciona
- [ ] Tener opciones de nombres de dominio preparadas

### Durante la reunión:

- [ ] Recopilar datos del cliente
- [ ] Elegir dominio juntos
- [ ] Comprar dominio
- [ ] Explicar el proceso

### Después de la reunión:

- [ ] Configurar DNS
- [ ] Actualizar archivo CNAME
- [ ] Hacer git push
- [ ] Configurar GitHub Pages
- [ ] Testear que funcione

### 48 horas después:

- [ ] Verificar que el dominio funciona
- [ ] Avisar al cliente que está listo
- [ ] Entregar credenciales si es necesario

---

**Fecha de creación:** Octubre 25, 2025  
**Proyecto:** Viajes de Larga Distancia - Tadeo  
**Desarrollador:** Emanuel Pusineri
