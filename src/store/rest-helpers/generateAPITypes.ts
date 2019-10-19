export default function generateAPITypes(resource:string) {
    return [
        `${resource}_REQUEST`,
        `${resource}_SUCCESS`,
        `${resource}_FAILURE`
    ]
}