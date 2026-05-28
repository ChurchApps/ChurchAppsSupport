---
title: "Edición masiva de personas"
---

# Edición masiva de personas

<div class="article-intro">
La edición masiva le permite actualizar varias personas a la vez, ahorrando tiempo al realizar el mismo cambio en muchas personas. Puede actualizar el estado de membresía, estado civil, género, preferencias de exclusión y membresías de grupos en una sola operación.
</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso para administrar datos de personas. Consulte [Roles y permisos](./roles-permissions.md) para obtener detalles.
- Ya debería haber agregado o importado las personas que desea editar. Consulte [Agregar personas](./adding-people.md) si es necesario.
</div>

## Seleccionar personas para edición masiva

1. Navegue a **Personas** en B1 Admin
2. Use las herramientas de búsqueda o filtro para encontrar las personas que desea actualizar
3. Marque las casillas junto al nombre de cada persona para seleccionarlas
   - Puede seleccionar personas individualmente
   - O use la casilla de verificación del encabezado para seleccionar todas las personas visibles en la página actual
4. Una vez que haya seleccionado al menos una persona, aparecerá el botón **Acciones masivas**

:::tip
Si necesita actualizar un grupo grande de personas según criterios específicos, use la función de [Búsqueda con IA](./ai-search.md) o filtros para reducir su lista primero, luego seleccione todas las personas coincidentes.
:::

## Acciones masivas disponibles

El menú de **Acciones masivas** proporciona varias opciones:

### Actualizar estado de membresía

Actualice el estado de membresía de todas las personas seleccionadas:

1. Haga clic en **Acciones masivas** → **Establecer estado de membresía**
2. Elija el nuevo estado:
   - **Visitante** -- Asistentes por primera vez u ocasionales
   - **Asistente regular** -- Asistentes frecuentes que no son miembros
   - **Miembro** -- Miembros oficiales de la iglesia
   - **Personal** -- Miembros del personal de la iglesia
   - **Inactivo** -- Personas que ya no asisten
3. Elija el modo de actualización:
   - **Sobrescribir todo** -- Reemplazar el estado actual de todas las personas seleccionadas
   - **Solo actualizar vacíos** -- Solo establecer el estado para personas que no tienen uno
4. Haga clic en **Actualizar**

### Actualizar estado civil

Actualice el estado civil de forma masiva:

1. Haga clic en **Acciones masivas** → **Establecer estado civil**
2. Seleccione el nuevo estado:
   - **Desconocido**
   - **Soltero**
   - **Casado**
   - **Divorciado**
   - **Viudo**
3. Elija si desea sobrescribir los valores existentes o solo actualizar los campos vacíos
4. Haga clic en **Actualizar**

### Actualizar género

Actualice la información de género de varias personas:

1. Haga clic en **Acciones masivas** → **Establecer género**
2. Seleccione el valor:
   - **No especificado**
   - **Masculino**
   - **Femenino**
3. Elija el modo de actualización (sobrescribir todo o solo vacíos)
4. Haga clic en **Actualizar**

### Actualizar estado de exclusión

Controle si las personas han optado por no recibir comunicaciones:

1. Haga clic en **Acciones masivas** → **Establecer exclusión**
2. Elija:
   - **No** -- Permitir comunicaciones (eliminar exclusión)
   - **Sí** -- Bloquear comunicaciones (establecer exclusión)
3. Elija el modo de actualización
4. Haga clic en **Actualizar**

:::warning
Tenga cuidado al cambiar el estado de exclusión. Las personas que se han excluido explícitamente no deben recibir comunicaciones a menos que hayan dado un nuevo consentimiento.
:::

### Agregar a grupo

Agregue todas las personas seleccionadas a uno o más grupos:

1. Haga clic en **Acciones masivas** → **Agregar a grupo**
2. Busque y seleccione el/los grupo(s) al que desea agregar personas
3. Puede seleccionar múltiples grupos para agregar personas a todos ellos
4. Haga clic en **Agregar a grupos**

Cada persona se agregará como miembro regular del/los grupo(s) seleccionado(s). Más tarde puede promover a personas individuales a líderes de grupo si es necesario desde la página de [Miembros del grupo](../groups/group-members.md).

### Eliminar de grupo

Elimine todas las personas seleccionadas de uno o más grupos:

1. Haga clic en **Acciones masivas** → **Eliminar de grupo**
2. Busque y seleccione el/los grupo(s) del que desea eliminar personas
3. Puede seleccionar múltiples grupos
4. Haga clic en **Eliminar de grupos**

:::info
Esta acción solo elimina personas de los grupos especificados. No elimina sus registros de persona.
:::

### Eliminar personas

Elimine permanentemente las personas seleccionadas de su base de datos de la iglesia:

1. Haga clic en **Acciones masivas** → **Eliminar**
2. Revise la lista de personas que se eliminarán
3. Escriba **DELETE** en el campo de confirmación
4. Haga clic en **Confirmar eliminación**

:::danger
Eliminar personas es permanente y no se puede deshacer. Esto eliminará todos sus datos, incluidos:
- Información personal
- Membresías de grupos
- Registros de asistencia
- Historial de donaciones
- Envíos de formularios

Solo use esta acción si está absolutamente seguro de que desea eliminar estas personas de su sistema.
:::

## Resultados de edición masiva

Después de completar una acción masiva, verá un resumen que muestra:

- **Total seleccionado** -- Cuántas personas se incluyeron en la operación
- **Actualizado exitosamente** -- Cuántos registros se cambiaron
- **Fallido** -- Registros que no se pudieron actualizar (si corresponde)
- **Sin cambios** -- Registros que no necesitaban cambios (por ejemplo, al usar el modo "solo actualizar vacíos")

Si alguna actualización falló, verá detalles de error que explican por qué.

## Mejores prácticas

- **Comience poco a poco** -- Pruebe las operaciones masivas en algunos registros primero para asegurarse de que está realizando los cambios correctos
- **Use filtros** -- Reduzca su lista con filtros o búsqueda con IA antes de seleccionar personas para asegurarse de que solo está actualizando a las personas correctas
- **Verifique las selecciones dos veces** -- Revise las personas seleccionadas antes de aplicar cambios masivos
- **Use el modo "solo actualizar vacíos"** -- Cuando desee completar datos faltantes sin sobrescribir información existente
- **Documente cambios importantes** -- Mantenga notas sobre actualizaciones masivas en caso de que necesite consultarlas más tarde
- **Coordine con su equipo** -- Informe a otros administradores cuando realice cambios masivos grandes

## Casos de uso comunes

### Actualizar nuevos miembros

Después de una clase de membresía, actualice a todos los asistentes al estado de Miembro:

1. Busque las personas que asistieron a la clase
2. Selecciónelas todas
3. Use **Acciones masivas** → **Establecer estado de membresía** → **Miembro**

### Organizar grupos pequeños

Agregue varias personas a un nuevo grupo pequeño:

1. Busque las personas que desea en el grupo
2. Selecciónelas
3. Use **Acciones masivas** → **Agregar a grupo** y seleccione el grupo pequeño

### Limpiar datos

Complete el estado civil faltante para parejas casadas:

1. Filtre por personas que están casadas (usando información del hogar)
2. Seleccione aquellas con estado civil en blanco
3. Use **Acciones masivas** → **Establecer estado civil** → **Casado** → **Solo actualizar vacíos**

## Artículos relacionados

- [Búsqueda de personas](./searching-people.md) -- Encuentre personas para editar
- [Búsqueda con IA](./ai-search.md) -- Use lenguaje natural para encontrar grupos específicos de personas
- [Miembros del grupo](../groups/group-members.md) -- Administre membresías de grupos
- [Exportar datos](./exporting-data.md) -- Exporte datos de personas antes de realizar cambios masivos
